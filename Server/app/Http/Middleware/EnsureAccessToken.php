<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAccessToken
{
    /**
     * Handle an incoming request.
     * Ensure the provided JWT token is of type 'access', not 'refresh'.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('api/refresh') || $request->is('api/login') || $request->is('api/register')) {
            return $next($request);
        }
        if (auth('api')->check()) {
            try {
                $payload = auth('api')->payload();
                if ($payload->get('token_type') && $payload->get('token_type') !== 'access') {
                    return response()->json([
                        'message' => 'Refresh token không thể dùng để truy cập trực tiếp tài nguyên API.',
                        'type' => 'error'
                    ], 401);
                }
            } catch (\Throwable $e) {
                return response()->json([
                    'message' => 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.',
                    'type' => 'error'
                ], 401);
            }
        }

        return $next($request);
    }
}
