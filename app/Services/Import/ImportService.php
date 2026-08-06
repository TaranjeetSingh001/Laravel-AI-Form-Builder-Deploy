<?php

namespace App\Services\Import;

use App\Models\Form;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class ImportService
{
    public function import(UploadedFile $file): Form
    {
        $extension = strtolower(
            $file->getClientOriginalExtension()
        );

        if (in_array($extension, ['xlsx', 'xls'])) {

            return $this->importExcel($file);

        }

        if ($extension === 'docx') {

            return $this->importWord($file);

        }

        throw new \Exception('Unsupported file.');
    }

    protected function importExcel(UploadedFile $file): Form
    {
        // We'll build this next
        abort(500, 'Excel import not implemented.');
    }

    protected function importWord(UploadedFile $file): Form
    {
        // We'll build this after Excel
        abort(500, 'Word import not implemented.');
    }
}