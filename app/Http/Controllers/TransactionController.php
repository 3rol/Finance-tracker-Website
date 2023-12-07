<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{


    public function index()
    {
        $userId = auth()->id();
        $transaction = Transaction::where('user_id', $userId)->paginate(10);
        logger($transaction);

        return Inertia::render('Transactions/Transactions', ['transactions' => $transaction]);
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
            return redirect()->back()->with('error', 'Transaction not found');
        }

        return Inertia::render('Transactions/Show', ['transaction' => $transaction]);
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
            return redirect()->back()->with('error', 'Transaction not found');
        }

        $transaction->update($validatedData);
        return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully');
    }


    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return redirect()->back()->with('error', 'Transaction not found');
        }

        $transaction->delete();
        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully');
    }
}
