<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CurrencyRate;
use Illuminate\Support\Facades\Http;

class CurrencyRatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $response = Http::get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        $data = $response->json();
        
        $date = $data['date'];
        $rates = $data['usd'];

        foreach ($rates as $currency => $rate) {
            CurrencyRate::updateOrCreate(
                ['currency_code' => $currency, 'date' => $date],
                ['rate' => $rate]
            );
        }
    }
}
