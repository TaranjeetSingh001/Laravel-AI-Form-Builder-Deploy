<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\FieldOption;

class ImportController extends Controller
{
    public function index()
    {
        return Inertia::render('Imports/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt,docx',
        ]);

        $extension = $request->file('file')->getClientOriginalExtension();

        if ($extension == 'csv') {

            $rows = [];

            if (($handle = fopen($request->file('file')->getRealPath(), 'r')) !== false) {

                while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                    $rows[] = $data;
                }

                fclose($handle);
            }

            // Remove header row
            array_shift($rows);

            // Create Form
            $form = Form::create([
                'user_id' => Auth::id(),
                'title' => pathinfo($request->file('file')->getClientOriginalName(), PATHINFO_FILENAME),
                'slug' => Str::slug(pathinfo($request->file('file')->getClientOriginalName(), PATHINFO_FILENAME))
                        .'-'.time(),
                'description' => 'Imported from CSV',
                'status' => 'draft',
                'is_ai_generated' => false,
            ]);

            foreach ($rows as $index => $row) {

                $field = FormField::create([
                    'form_id' => $form->id,
                    'label' => trim($row[0]),
                    'name' => Str::snake(trim($row[0])),
                    'type' => strtolower(trim($row[1])),
                    'placeholder' => $row[3] ?? null,
                    'is_required' => strtolower(trim($row[2])) === 'yes',
                    'sort_order' => $index + 1,
                ]);

                if (
                    isset($row[4]) &&
                    ! empty(trim($row[4])) &&
                    in_array($field->type, ['select', 'radio', 'checkbox'])
                ) {

                    $options = explode('|', trim($row[4]));

                    foreach ($options as $i => $option) {

                        FieldOption::create([
                            'field_id' => $field->id,
                            'label' => trim($option),
                            'value' => trim($option),
                            'sort_order' => $i + 1,
                        ]);
                    }
                }
            }

            return redirect()
                ->route('forms.edit', $form->id)
                ->with('success', 'Form imported successfully.');
        }

        return back()->with('error', 'DOCX import will be implemented next.');
    }
}
