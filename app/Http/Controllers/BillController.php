<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $bills = Bill::where('user_id', $userId)->get();

        return Inertia::render('BillsAndPayments/BillsAndPayments', ['bills' => $bills]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'nullable|string',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'frequency' => 'required|in:monthly,weekly',
        ]);

        Bill::create(array_merge($validatedData, ['user_id' => auth()->id()]));
        return redirect()->route('bills')->with('success', 'Bill added successfully.');

    }



    public function show($id)
    {

        $userId = auth()->id();
        $bill = Bill::where('user_id', $userId)->first();

        return Inertia::render('BillsAndPayments/BillsAndPayments', ['bill' => $bill]);
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
            return redirect()->back()->with('error', 'Bill not found');
        }

        $bill->update($validatedData);
        return redirect()->route('bills', $bill->id)->with('success', 'Bill updated successfully.');
    }

    public function destroy($id)
    {
        $bill = Bill::find($id);

        if (!$bill) {
            return redirect()->back()->with('error', 'Bill not found');
        }

        $bill->delete();
        return redirect()->route('bill.index')->with('success', 'Bill deleted successfully');
    }

}
