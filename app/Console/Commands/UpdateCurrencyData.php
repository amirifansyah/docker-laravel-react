<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\CurrencyRate; // Sesuaikan dengan model yang Anda buat

class UpdateCurrencyData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'currency:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update currency data from external API';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $response = Http::get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        $data = $response->json();
        $date = $data['date'];
        collect($data['usd'])->map(function($key, $value) use (&$date) {
            CurrencyRate::updateOrCreate(
                [
                    'currency_code' => $value
                ],
                [
                    'date' => $date,
                    'rate' => $key
                ],
            );
        });

        $this->info('Currency data updated successfully.');

        return 0;
    }
}
