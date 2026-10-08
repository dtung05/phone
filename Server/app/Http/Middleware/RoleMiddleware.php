<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    // nhận danh sách quyền đc xem truyền vào
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $role = auth()->user()->role;
        if ($role === 'Quản trị viên' || in_array($role, $roles)) {
            return $next($request);
        }
        abort(403);
    }
}
