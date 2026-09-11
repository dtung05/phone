<?php

namespace App\Repositories;

interface RepositoryInterface
{


    function getAll();

    function find($id);

    function update($id, $attributes = []);

    function create($attribuites = []);

    function delete($id);

    function getTrashed();

    function restore($id);
}
