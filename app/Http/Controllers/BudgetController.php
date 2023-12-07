<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function __invoke(Request $request)
    {

        $budgets = Budget::all();
        return response()->json($budgets);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string|max:50',
            'limit_amount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);


        $budget = Budget::create($validatedData);
        return response()->json($budget, 201);
    }

    public function show($id)
    {

        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found!'], 404);
        }

        return response()->json($budget);
    }

    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'category' => 'sometimes|string|max:50',
            'limit_amount' => 'sometimes|numeric',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);


        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found!'], 404);
        }

        $budget->update($validatedData);
        return response()->json($budget);
    }

    public function destroy($id)
    {

        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found!'], 404);
        }

        $budget->delete();
        return response()->json(['message' => 'Budget deleted successfully!']);
    }
}
