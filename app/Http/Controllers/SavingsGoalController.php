<?php

namespace App\Http\Controllers;

use App\Models\SavingsGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\Balance;

class SavingsGoalController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $savings = SavingsGoal::where('user_id', $userId)->get();


        $balance = Balance::where('user_id', $userId)->first();
        $currentBalance = $balance ? $balance->available_balance : 0;

        return Inertia::render('Savings/Savings', [
            'savings' => $savings,
            'balance' => $currentBalance,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'goal_name' => 'required|string|max:100',
            'target_amount' => 'required|numeric',
            'current_amount' => 'numeric',
            'target_date' => 'required|date',
        ]);

        SavingsGoal::create(array_merge($validatedData, ['user_id' => auth()->id()]));
        return redirect()->route('savings')->with('success', 'Savings Goal added successfully.');
    }

    public function show($id)
    {

        $savingsGoal = SavingsGoal::find($id);

        if (!$savingsGoal) {
            return response()->json(['message' => 'Savings Goal not found'], 404);
        }

        // return response()->json($savingsGoal);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'goal_name' => 'sometimes|string|max:100',
            'target_amount' => 'sometimes|numeric',
            'current_amount' => 'sometimes|numeric',
            'target_date' => 'sometimes|date',
        ]);

        $savingsGoal = SavingsGoal::find($id);

        if (!$savingsGoal) {
            return redirect()->back()->with('error', 'Savings Goal not found');
        }

        $savingsGoal->update($validatedData);

        return redirect()->route('savings')->with('success', 'Savings Goal updated successfully.');
    }


    public function destroy($id)
    {
        Log::info("Attempting to delete savings goal with ID: $id");

        $savingsGoal = SavingsGoal::find($id);

        if (!$savingsGoal) {
            Log::error("Savings goal not found with ID: $id");
            return redirect()->back()->with('error', 'Savings Goal not found');
        }

        $savingsGoal->delete();
        return redirect()->route('dashboard')->with('success', 'Savings Goal deleted successfully');
    }

}
