<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Balance;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BalanceController extends Controller
{
    /**
     * Display the current user's balance.
     */
    public function showDashboard()
    {
        $userId = auth()->id();
        $balance = Balance::where('user_id', $userId)->first();

        return Inertia::render('Dashboard', [
            'balance' => $balance ? $balance->available_balance : 0
        ]);
    }

    /**
     * Add to the user's balance.
     */
    public function add(Request $request)
    {
        $user = Auth::user();
        $balance = Balance::where('user_id', $user->id)->first();
        $balance->amount += $request->amount;
        $balance->save();

        return back()->with('success', 'Balance updated successfully.');
    }

    /**
     * Subtract from the user's balance.
     */
    public function subtract(Request $request)
    {
        $user = Auth::user();
        $balance = Balance::where('user_id', $user->id)->first();
        $balance->amount -= $request->amount;
        $balance->save();

        return back()->with('success', 'Balance updated successfully.');
    }
}
