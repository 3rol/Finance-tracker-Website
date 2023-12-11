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
        // \Log::info("Updating transaction with ID: $id", $request->all());

        $transaction = Transaction::find($id);
        if (!$transaction) {
            return redirect()->back()->with('error', 'Transaction not found');
        }

        $validatedData = $request->validate([
            'amount' => 'sometimes|numeric',
            'type' => 'sometimes|string|max:50',
            'category' => 'sometimes|string|max:50',
            'transaction_date' => 'sometimes|date',
            'description' => 'nullable|string',
        ]);

        $oldAmount = $transaction->amount;
        $oldType = $transaction->type;

        $transaction->update($validatedData);

        if ($validatedData['amount'] != $oldAmount || $validatedData['type'] != $oldType) {
            $balance = Balance::where('user_id', auth()->id())->firstOrFail();

            if ($oldType === 'Income') {
                $balance->available_balance -= $oldAmount;
            } elseif ($oldType === 'Expense') {
                $balance->available_balance += $oldAmount;
            }

            if ($validatedData['type'] === 'Income') {
                $balance->available_balance += $validatedData['amount'];
            } elseif ($validatedData['type'] === 'Expense') {
                $balance->available_balance -= $validatedData['amount'];
            }

            $balance->save();
        }

        return redirect()->route('dashboard')->with('success', 'Transaction updated successfully.');
    }





    public function destroy($id)
    {
        // \Log::info("Deleting transaction with ID: $id");


        $transaction = Transaction::find($id);


        if (!$transaction) {
            return redirect()->back()->with('error', 'Transaction not found');
        }


        $balance = Balance::where('user_id', auth()->id())->firstOrFail();


        if ($transaction->type === 'Income') {
            $balance->available_balance -= $transaction->amount;
        } elseif ($transaction->type === 'Expense') {
            $balance->available_balance += $transaction->amount;
        }


        $balance->save();
        $transaction->delete();


        return redirect()->route('dashboard')->with('success', 'Transaction deleted successfully');
    }


}
