<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CurrencyRate;

class CurrencyRateController extends Controller
{
    public function index()
    {
        $rates = CurrencyRate::all();
        return response()->json($rates);
    }
}
