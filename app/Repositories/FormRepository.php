<?php

namespace App\Repositories;

use App\Models\Form;

class FormRepository
{
    public function create(array $data): Form
    {
        return Form::create($data);
    }

    public function update(Form $form, array $data): Form
    {
        $form->update($data);

        return $form->fresh();
    }

    public function delete(Form $form): bool
    {
        return $form->delete();
    }

    public function find(int $id): ?Form
    {
        return Form::find($id);
    }
}