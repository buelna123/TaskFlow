import React from 'react';

const Profile: React.FC = () => {
    // Aquí puedes obtener los datos del usuario desde un contexto, props o llamada a API
    const user = {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Desarrollador Frontend apasionado por React y TypeScript.',
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #eee', background: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
                />
                <h2>{user.name}</h2>
                <p style={{ color: '#888', marginBottom: 8 }}>{user.email}</p>
                <p style={{ textAlign: 'center' }}>{user.bio}</p>
            </div>
        </div>
    );
};

export default Profile;