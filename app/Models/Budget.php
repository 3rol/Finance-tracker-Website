<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;


    protected $table = "budgets";
    protected $fillable = ['user_id', 'category', 'limit_amount', 'start_date', 'end_date'];
}
