<?php

namespace App\Enums;

enum FieldType:string
{
    case TEXT='text';

    case EMAIL='email';

    case NUMBER='number';

    case TEXTAREA='textarea';

    case DATE='date';

    case SELECT='select';

    case RADIO='radio';

    case CHECKBOX='checkbox';

    case FILE='file';
}