import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'semantic-ui-react';

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <Button
            onClick={() => logout()}
            id='qsLogoutBtn'
            variant='danger'
            basic color="red"
        >
            Log Out
        </Button>
    );
};
