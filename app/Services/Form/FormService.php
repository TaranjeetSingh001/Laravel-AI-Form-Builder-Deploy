<?php

namespace App\Services\Form;

use App\Models\Form;
use App\Repositories\FormRepository;
use Illuminate\Support\Str;

class FormService
{
    public function __construct(
        protected FormRepository $repository
    ) {}

    public function create(array $data): Form
    {
        return $this->repository->create([

            'user_id' => auth()->id(),

            'title' => $data['title'],

            'slug' => Str::slug($data['title']) . '-' . time(),

            'description' => $data['description'] ?? null,

            'status' => $data['status'],

            'is_ai_generated' => false,

        ]);
    }

    public function update(Form $form, array $data): Form
    {
        return $this->repository->update($form, $data);
    }

    public function delete(Form $form): bool
    {
        return $this->repository->delete($form);
    }
}