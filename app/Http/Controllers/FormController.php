<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\FormField;
use App\Http\Requests\StoreFormRequest;
use App\Http\Requests\UpdateFormRequest;
use App\Services\Form\FormService;
use App\Models\FormResponse;
use App\Models\ResponseAnswer;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{
    protected FormService $formService;

public function __construct(FormService $formService)
{
    $this->formService = $formService;
}

    public function index(Request $request)
{
    $search = $request->search;

    $forms = Form::query()
        ->when($search, function ($query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Forms/Index', [
        'forms' => $forms,
        'filters' => [
            'search' => $search,
        ],
    ]);
}

public function builder(Form $form)
{
      $form->load('fields.options');

    return Inertia::render('Forms/Builder', [
        'form' => $form
    ]);
}

public function storeField(Request $request, Form $form)
{
    $validated = $request->validate([

        'label' => 'required|max:255',

        'type' => 'required',

        'required' => 'boolean',

    ]);

    FormField::create([

        'form_id' => $form->id,

        'label' => $validated['label'],

        'name' => \Illuminate\Support\Str::slug($validated['label'], '_'),

        'type' => $validated['type'],

        'is_required' => $validated['required'],

        'sort_order' => $form->fields()->count() + 1,

    ]);

    return back();
}


    public function create()
    {
        return Inertia::render('Forms/Create');
    }

public function store(StoreFormRequest $request)
{
    $this->formService->create($request->validated());

    return redirect()
        ->route('forms.index')
        ->with('success', 'Form created successfully.');
}

    public function show(Form $form)
    {
        return Inertia::render('Forms/Show', [
            'form' => $form
        ]);
    }

    public function edit(Form $form)
{
    $form->load('fields.options');

    return Inertia::render('Forms/Edit', [
        'form' => $form,
    ]);
}

public function destroy(Form $form)
{
    if ($form->user_id !== auth()->id()) {
        abort(403);
    }

    $form->delete();

    return redirect()
        ->route('forms.index')
        ->with('success', 'Form deleted successfully.');
}
    public function updateField(Request $request, Form $form, FormField $field)
{
    $validated = $request->validate([
        'label' => 'required|max:255',
        'type' => 'required',
        'required' => 'boolean',
    ]);

    $field->update([
        'label' => $validated['label'],
        'name' => \Illuminate\Support\Str::slug($validated['label'], '_'),
        'type' => $validated['type'],
        'is_required' => $validated['required'],
    ]);

    return back();
}

public function destroyField(Form $form, FormField $field)
{
    $field->delete();

    return back();
}


public function render(Form $form)
{
    $form->load('fields.options');

    return Inertia::render('Forms/Render', [
        'form' => $form,
    ]);
}

public function submit(Request $request, Form $form)
{

  $form->load('fields');

    $rules = [];

    foreach ($form->fields as $field) {

        $rule = [];

        if ($field->is_required) {
            $rule[] = 'required';
        } else {
            $rule[] = 'nullable';
        }

        switch ($field->type) {

            case 'email':
                $rule[] = 'email';
                break;

            case 'number':
                $rule[] = 'numeric';
                break;

            case 'date':
                $rule[] = 'date';
                break;

            case 'file':
                $rule[] = 'file';
                break;
        }

        $rules[$field->name] = implode('|', $rule);
    }

    $validated = $request->validate($rules);
    DB::transaction(function () use ($request, $form) {

        $response = FormResponse::create([

            'form_id' => $form->id,

            'submitted_by' => auth()->id(),

            'ip_address' => $request->ip(),

            'user_agent' => $request->userAgent(),

            'submitted_at' => now(),

        ]);

        foreach ($form->fields as $field) {

            $value = $request->input($field->name);

            if ($field->type === 'file' && $request->hasFile($field->name)) {

                $value = $request
                        ->file($field->name)
                        ->store('responses', 'public');

            }

            if (is_array($value)) {

                $value = json_encode($value);

            }

            ResponseAnswer::create([

                'response_id' => $response->id,

                'field_id' => $field->id,

                'answer' => $value,

            ]);

        }

    });

    return redirect()
        ->back()
        ->with('success', 'Form submitted successfully.');
}
}