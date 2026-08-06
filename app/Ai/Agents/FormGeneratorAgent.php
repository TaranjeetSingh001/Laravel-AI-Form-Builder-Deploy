<?php

namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Messages\Message;
use Laravel\Ai\Promptable;

class FormGeneratorAgent implements Agent, Conversational, HasStructuredOutput, HasTools
{
    use Promptable;

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): string
    {
        return <<<'PROMPT'
You are an expert Form Builder AI.

Generate professional business forms.

Rules:

1. Return ONLY structured JSON.

2. Every field must contain:
   - label
   - type
   - required

3. Supported types:

text
email
number
textarea
date
select
radio
checkbox
file

4. If field type is select/radio,
return options array.

5. Generate a professional title.

6. Generate a short description.

Never return markdown.

Never explain anything.

Only return structured data.
PROMPT;
    }

    /**
     * Get the list of messages comprising the conversation so far.
     *
     * @return Message[]
     */
    public function messages(): iterable
    {
        return [];
    }

    /**
     * Get the tools available to the agent.
     *
     * @return Tool[]
     */
    public function tools(): iterable
    {
        return [];
    }

    /**
     * Get the agent's structured output schema definition.
     */
public function schema(JsonSchema $schema): array
{
    return [

        'title' => $schema
            ->string()
            ->required(),

        'description' => $schema
            ->string()
            ->required(),

        'fields' => $schema
            ->array()
            ->items(

                $schema->object(fn ($schema) => [

                    'label' => $schema
                        ->string()
                        ->required(),

                    'type' => $schema
                        ->string()
                        ->required(),

                    'required' => $schema
                        ->boolean()
                        ->required(),

                    'options' => $schema
                        ->array()
                        ->items(
                            $schema->string()
                        ),

                ])

            )
            ->required(),

    ];
}
}
