<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\GenerateAIRequest;
use App\Services\AI\AIService;

class AIController extends Controller
{
    public function index()
    {
        return Inertia::render('AI/Generate');
    }

   public function generate(
    GenerateAIRequest $request,
    AIService $service
)
{
    $form = $service->generate(

        $request->validated()['prompt']

    );

    return redirect()
    ->route('forms.index')
    ->with('success', 'AI form generated successfully.');
}
}