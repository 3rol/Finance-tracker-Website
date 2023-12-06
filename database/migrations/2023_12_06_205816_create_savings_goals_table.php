<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSavingsGoalsTable extends Migration
{
    public function up()
    {
        Schema::create('savings_goals', function (Blueprint $table) {
            $table->id('goal_id');
            $table->unsignedBigInteger('user_id');
            $table->string('goal_name', 100);
            $table->decimal('target_amount', 10, 2);
            $table->decimal('current_amount', 10, 2)->default(0);
            $table->date('target_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });


    }

    public function down()
    {
        Schema::dropIfExists('savings_goals');
    }
}