import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Logout,
  Settings,
  AccountCircle,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, open, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/login');
  };

  const handleSettings = () => {
    onClose();
    navigate('/settings');
  };

  const handleProfile = () => {
    onClose();
    navigate('/profile');
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Meu Perfil</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Configurações</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Sair</ListItemText>
      </MenuItem>
    </Menu>
  );
};
