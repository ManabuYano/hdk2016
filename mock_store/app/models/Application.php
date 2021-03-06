<?php

class Application extends Eloquent{
	protected $guarded = array('id');
	public function company(){
		return $this->belongsTo('Company');
	}
	public function user(){
		return $this->belongsTo('User', 'manager_id');
	}

	public function category(){
		return $this->belongsTo('Category', 'category_id');
	}

	public function reviewer(){
		return $this->belongsTo('Review', 'reviewer_id');
	}
	
	public function event(){
		return $this->belongsTo('EventModel', 'event_id');
	}
}
