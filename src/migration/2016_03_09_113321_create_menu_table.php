<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('table');
            $table->string('id_field');
            $table->string('text_field');
            $table->tinyInteger('translated')->default(0);
        });
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug');
            $table->text('items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('menu_type');
        Schema::drop('menus');
    }
}
