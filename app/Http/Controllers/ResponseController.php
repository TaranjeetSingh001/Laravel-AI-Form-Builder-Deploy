<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResponseController extends Controller
{
    public function index(Form $form)
    {
        $responses = FormResponse::where('form_id', $form->id)
            ->with('answers.field')
            ->latest()
            ->paginate(10);

        $previewFields = $form->fields()
            ->orderBy('sort_order')
            ->take(4)
            ->get();

        return Inertia::render('Responses/Index', [
            'form' => $form,
            'responses' => $responses,
            'previewFields' => $previewFields,
        ]);
    }

    public function show(Form $form, FormResponse $response)
    {
        $response->load('answers.field');

        return Inertia::render('Responses/Show', [

            'form' => $form,

            'response' => $response,

        ]);
    }

    public function destroy(Form $form, FormResponse $response)
    {
        $response->answers()->delete();

        $response->delete();

        return redirect()
            ->route('responses.index', $form->id)
            ->with('success', 'Response deleted successfully.');
    }

    public function edit(Form $form, FormResponse $response)
    {
        $response->load('answers.field.options');

        return Inertia::render('Responses/Edit', [
            'form' => $form,
            'response' => $response,
        ]);
    }

    public function update(Request $request, Form $form, FormResponse $response)
    {
        foreach ($response->answers as $answer) {

            $field = $answer->field;

            $value = $request->input($field->name);

            if ($field->type === 'file' && $request->hasFile($field->name)) {

                if ($answer->answer) {
                    Storage::delete($answer->answer);
                }

                $value = $request
                    ->file($field->name)
                    ->store('responses');

            }

            if (is_array($value)) {
                $value = json_encode($value);
            }

            $answer->update([
                'answer' => $value,
            ]);
        }

        return redirect()
            ->route('responses.show', [$form->id, $response->id])
            ->with('success', 'Response updated successfully.');
    }
}
