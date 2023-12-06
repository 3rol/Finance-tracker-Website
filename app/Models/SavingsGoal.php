<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingsGoal extends Model
{
    use HasFactory;

    protected $table = "savings_goals";

    protected $fillable = ['user_id', 'goal_name', 'target_amount', 'current_amount', 'target_date'];
}
