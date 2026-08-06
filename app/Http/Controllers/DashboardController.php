<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormResponse;
use App\Models\Import;
use App\Models\AiGeneration;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [

            'stats' => [

                'totalForms' => Form::count(),

                'publishedForms' => Form::where('status', 'published')->count(),

                'draftForms' => Form::where('status', 'draft')->count(),

                'aiForms' => Form::where('is_ai_generated', true)->count(),

                'responses' => FormResponse::count(),

                'imports' => Import::count(),

            ],

            'recentForms' => Form::latest()
                ->take(5)
                ->get(),

            'recentAi' => AiGeneration::latest()
                ->take(5)
                ->get(),

            'recentImports' => Import::latest()
                ->take(5)
                ->get(),

        ]);
    }
}