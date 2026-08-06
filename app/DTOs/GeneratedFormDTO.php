<?php

namespace App\DTOs;

class GeneratedFormDTO
{
    public function __construct(
        public string $title,
        public ?string $description,
        public array $fields
    ) {}
}