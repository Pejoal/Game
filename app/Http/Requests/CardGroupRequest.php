<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CardGroupRequest extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array {
    return [
      'name' => ['required', 'min:1'],
      'description' => ['nullable', 'max:2000'],
      'type' => [
        'required',
        'string',
        Rule::unique('card_groups')->where(function ($query) {
          return $query->where('story_id', $this->route('story')->id);
        })->ignore($this->id),
      ],
    ];
  }
}
