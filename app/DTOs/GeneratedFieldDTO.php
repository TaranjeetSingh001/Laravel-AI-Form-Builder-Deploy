<?php

namespace App\DTOs;

class GeneratedFieldDTO
{
    public function __construct(
        public string $label,
        public string $type,
        public bool $required,
        public array $options = []
    ) {}
}