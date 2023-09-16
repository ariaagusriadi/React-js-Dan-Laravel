<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function store(Request $request): Response
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'description' => 'required',
            'picture' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        $product = new Product();
        $product->name = $request->name;    
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->description = $request->description;

        if ($request->hasFile('picture')) {
            $extension = $request->file('picture')->extension();
            $name = Str::random(8);
            $url = $request->file('picture')->storeAs('image', "$name." . $extension);
            $product->picture = $url;
        }

        $product->save();

        return response()->json(['data' => $product], 200);
    }

    public function index(): Response
    {
        $product = Product::all();

        return response()->json(['data' => $product], 200);
    }

    public function show(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'product not found!'], 422);
        }

        return response()->json(['data' => $product], 200);
    }

    public function showQueryParams(Request $request): Response
    {
        $query = $request->query('id');
        $product = Product::find($query);

        if (!$product) {
            return response()->json(['error' => 'product not found!'], 422);
        }

        return response()->json(['data' => $product], 200);
    }

    public function update(Request $request, Product $product): Response
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        if (!$product) {
            return response()->json(['error' => 'product not found!'], 422);
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->description = $request->description;

        if ($request->hasFile('picture')) {
            unlink(public_path($product->picture));

            $extension = $request->file('picture')->extension();
            $name = Str::random(8);
            $url = $request->file('picture')->storeAs('image', "$name." . $extension);
            $product->picture = $url;
        }

        $product->save();

        return response()->json(['data' => $product], 200);
    }

    public function destroy(Product $product): Response
    {
        unlink(public_path($product->picture));
        $product->delete();
        return response()->json(['success' => 'delete product'], 200);
    }
}
