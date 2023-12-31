<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $table = "bills";
    protected $primaryKey = 'bill_id';

    protected $fillable = ['user_id', 'amount', 'due_date', 'frequency', 'description'];
}
