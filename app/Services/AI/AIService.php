<?php

namespace App\Services\AI;

use App\Ai\Agents\FormGeneratorAgent;
use App\DTOs\GeneratedFormDTO;
use App\Models\FieldOption;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AIService
{
    public function generate(string $prompt): GeneratedFormDTO
    {
        $response = (new FormGeneratorAgent)->prompt($prompt);

        $data = $response->structured;

        return DB::transaction(function () use ($data) {

            $form = Form::create([
                'user_id' => Auth::id(),
                'title' => $data['title'],
                'slug' => Str::slug($data['title']) . '-' . time(),
                'description' => $data['description'],
                'status' => 'draft',
                'is_ai_generated' => true,
            ]);

            foreach ($data['fields'] as $index => $fieldData) {

                $field = FormField::create([
                    'form_id' => $form->id,

                    'label' => $fieldData['label'],

                    'name' => Str::slug(
                        $fieldData['label'],
                        '_'
                    ),

                    'type' => $fieldData['type'],

                    'placeholder' => null,

                    'default_value' => null,

                    'help_text' => null,

                    'is_required' => $fieldData['required'] ?? false,

                    'validation_rules' => null,

                    'sort_order' => $index + 1,
                ]);

                

                /*
                 * Store options for select/radio fields
                 */
                if (!empty($fieldData['options'])) {

                    foreach ($fieldData['options'] as $option) {

                        FieldOption::create([
                            'field_id' => $field->id,
                            'label' => $option,
                            'value' => Str::slug($option, '_'),
                            'sort_order' => 1,
                        ]);
                    }
                }
            }

            return new GeneratedFormDTO(
                title: $data['title'],
                description: $data['description'],
                fields: $data['fields']
            );
        });
    }
}