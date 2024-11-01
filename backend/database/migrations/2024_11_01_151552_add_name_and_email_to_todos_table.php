<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->string('firstname')->after('title'); // Corrected 'befor' to 'before'
            $table->string('lastname')->after('firstname'); // Add lastname column after firstname
            $table->string('email')->unique()->after('lastname'); // Add email column after lastname
        });
    }
    
    public function down()
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->dropColumn(['firstname', 'lastname', 'email']); // Drop columns in case of rollback
        });
    }
    

};
