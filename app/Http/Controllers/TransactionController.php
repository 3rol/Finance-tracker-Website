<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Balance;

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
            'type' => 'required|string|in:Income,Expense',
            'category' => 'required|string|max:50',
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        Transaction::create(array_merge($validatedData, ['user_id' => auth()->id()]));
        $balance = Balance::firstOrCreate(['user_id' => auth()->id()], ['available_balance' => 0]);


        if ($validatedData['type'] === 'Income') {
            $balance->available_balance += $validatedData['amount'];
        } elseif ($validatedData['type'] === 'Expense') {
            $balance->available_balance -= $validatedData['amount'];
        }


        $balance->save();

        // return Inertia::render('Dashboard', [
        //     'success' => 'Transaction added successfully.'
        // ]);
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
