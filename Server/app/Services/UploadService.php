<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadService
{
    // tải lên 1 ảnh
    public function uploadSingle(?UploadedFile $file, $folder)
    {
        if (!$file) {
            return null;
        }
        return $file->store($folder, 'public');
    }
    // tải lên nhiều ảnh
    public function uploadMultiple(?array $files, $folder)
    {
        if (!$files) {
            return [];
        }
        $uploaderFiles = [];
        foreach ($files as $file) {
            $uploaderFiles[] = $this->uploadSingle($file, $folder);
        }
        return $uploaderFiles;
    }
    //xóa 1 ảnh
    public function deleteFile(?string $path): bool
    {
        if ($path && Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        return false;
    }
    // xóa nhiều ảnh
    public function deleteMultiple(?array $paths): void
    {
        if (empty($paths)) {
            return;
        }
        foreach ($paths as $path) {
            $this->deleteFile($path);
        }
    }
}
