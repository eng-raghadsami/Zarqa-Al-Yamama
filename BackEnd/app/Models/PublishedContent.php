<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublishedContent extends Model
{
    use HasFactory;
    protected $table = 'published_contents';
    protected $fillable = ['content_id','journalist_id','editor_id','published_at','updated_by'];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function journalist()
    {
        return $this->belongsTo(User::class, 'journalist_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
