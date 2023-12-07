<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function apiIndex()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
    }

    public function index()
    {

        $transactions = Transaction::all();
        return Inertia::render('Home', ['transactions' => $transactions]);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'account_id' => 'required|exists:accounts,account_id',
            'amount' => 'required|numeric',
            'type' => 'required|string|max:50',
            'category' => 'required|string|max:50',
            'transaction_date' => 'required|date',
            'description' => 'nullable|string',
        ]);


        $transaction = Transaction::create($validatedData);
        return redirect()->route('transactions.index');
    }

    public function show($id)
    {

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }

    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'amount' => 'sometimes|numeric',
            'type' => 'sometimes|string|max:50',
            'category' => 'sometimes|string|max:50',
            'transaction_date' => 'sometimes|date',
            'description' => 'nullable|string',
        ]);


        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->update($validatedData);
        return response()->json($transaction);
    }

    public function destroy($id)
    {

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}
