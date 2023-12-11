<?php

namespace App\Http\Controllers;

use App\Models\SavingsGoal;
use Illuminate\Http\Request;
use App\Models\Balance;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Bill;
use App\Models\Transaction;


class BalanceController extends Controller
{

    public function showDashboard()
    {
        $userId = auth()->id();

        $balance = Balance::where('user_id', $userId)->first();
        $totalExpenses = $this->calculateTotalExpenses($userId);
        $totalIncome = $this->calculateTotalIncome($userId);
        $totalSavings = SavingsGoal::where('user_id', $userId)->sum('target_amount');

        return Inertia::render('Dashboard', [
            'balance' => $balance ? $balance->available_balance : 0,
            'totalExpenses' => $totalExpenses,
            'totalIncome' => $totalIncome,
            'totalSavings' => $totalSavings,
        ]);
    }

    private function calculateTotalExpenses($userId)
    {
        $totalBills = Bill::where('user_id', $userId)->sum('amount');
        $totalExpensesTransactions = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->sum('amount');

        return $totalBills + $totalExpensesTransactions;
    }
    private function calculateTotalIncome($userId)
    {
        return Transaction::where('user_id', $userId)
            ->where('type', 'income')
            ->sum('amount');
    }

    public function add(Request $request)
    {
        $request->validate([
            'available_balance' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();
        $balance = Balance::firstOrCreate(
            ['user_id' => $user->id],
            ['available_balance' => 0]
        );

        try {
            $balance->available_balance += $request->available_balance;
            $balance->save();
        } catch (\Exception $e) {

            \Log::error("Error updating balance: " . $e->getMessage());

        }


    }

    public function subtract(Request $request)
    {
        $user = Auth::user();
        $balance = Balance::where('user_id', $user->id)->first();
        $balance->amount -= $request->amount;
        $balance->save();


    }
}
