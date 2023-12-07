<?php

namespace App\Http\Controllers;

use App\Models\SavingsGoal;
use Illuminate\Http\Request;

class SavingsGoalController extends Controller
{
    public function __invoke(Request $request)
    {

        $savingsGoals = SavingsGoal::all();
        return response()->json($savingsGoals);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'goal_name' => 'required|string|max:100',
            'target_amount' => 'required|numeric',
            'current_amount' => 'numeric',
            'target_date' => 'required|date',
        ]);


        $savingsGoal = SavingsGoal::create($validatedData);
        return response()->json($savingsGoal, 201);
    }

    public function show($id)
    {

        $savingsGoal = SavingsGoal::find($id);

        if (!$savingsGoal) {
            return response()->json(['message' => 'Savings Goal not found'], 404);
        }

        return response()->json($savingsGoal);
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
            return response()->json(['message' => 'Savings Goal not found'], 404);
        }

        $savingsGoal->update($validatedData);
        return response()->json($savingsGoal);
    }

    public function destroy($id)
    {

        $savingsGoal = SavingsGoal::find($id);

        if (!$savingsGoal) {
            return response()->json(['message' => 'Savings Goal not found'], 404);
        }

        $savingsGoal->delete();
        return response()->json(['message' => 'Savings Goal deleted successfully']);
    }
}
