<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SavingsGoalController;
use App\Http\Controllers\TransactionController;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/transactions/store', [TransactionController::class, 'store'])->name('transactions.store');
    Route::post('/savingsgoals/store', [SavingsGoalController::class, 'store'])->name('savings.store');
    Route::post('/billsandpayments/store', [BillController::class, 'store'])->name('bills.store');
    Route::get('/savingsgoals', [SavingsGoalController::class, 'index'])->name('savings');
    Route::post('/add-balance', [BalanceController::class, 'add'])->name('add-balance');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
    Route::get('/billsandpayments', [BillController::class, 'index'])->name('bills');
    Route::get('/dashboard', [BalanceController::class, 'showDashboard'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
