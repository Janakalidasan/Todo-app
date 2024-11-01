<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //

    protected $fillable = ['title','firstname','lastname','email', 'description', 'is_completed'];

}
