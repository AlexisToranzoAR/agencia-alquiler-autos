document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
    $deleteAction.addEventListener('click', (e) => {
        const { id, names, lastNames } = $deleteAction.dataset;
        if (
            !confirm(
                `Confirma que desea eliminar el cliente ${names} ${lastNames} (ID: ${id})? Esta operación no se puede deshacer`
            )
        ) {
            e.preventDefault();
            return false;
        }

        return true;
    });
});
