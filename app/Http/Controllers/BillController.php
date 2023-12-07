<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    public function __invoke(Request $request)
    {

        $bills = Bill::all();
        return response()->json($bills);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'frequency' => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);


        $bill = Bill::create($validatedData);
        return response()->json($bill, 201);
    }

    public function show($id)
    {

        $bill = Bill::find($id);

        if (!$bill) {
            return response()->json(['message' => 'Bill not found'], 404);
        }

        return response()->json($bill);
    }

    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'amount' => 'sometimes|numeric',
            'due_date' => 'sometimes|date',
            'frequency' => 'sometimes|string|max:50',
            'description' => 'nullable|string',
        ]);


        $bill = Bill::find($id);

        if (!$bill) {
            return response()->json(['message' => 'Bill not found'], 404);
        }

        $bill->update($validatedData);
        return response()->json($bill);
    }

    public function destroy($id)
    {

        $bill = Bill::find($id);

        if (!$bill) {
            return response()->json(['message' => 'Bill not found'], 404);
        }

        $bill->delete();
        return response()->json(['message' => 'Bill deleted successfully']);
    }
}
