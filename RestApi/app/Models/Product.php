<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $KeyType = 'string';
    public $incrementing = false;

    public static function boot(){
        parent::boot();
        static::creating(function($item){
            $item->id = (string) Str::orderedUuid();
        });
    }

}
