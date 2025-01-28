import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Lock as LockIcon,
  AccessTime as AccessTimeIcon,
  Engineering as EngineeringIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface OrdemServico {
  id: string;
  title: string;
  requester: string;
  status: 'EM_ABERTO' | 'EM_ESPERA' | 'EM_PROGRESSO' | 'CONCLUIDO';
  equipment: string;
  dueDate: string;
  isAutomatic?: boolean;
  isDelayed?: boolean;
  comments?: {
    user: string;
    action: string;
    fromStatus?: string;
    toStatus?: string;
    date: string;
  }[];
}

const mockOrders: OrdemServico[] = [
  {
    id: 'GC-009',
    title: 'Análise de Rolamentos Motor',
    requester: 'Carlos Almeida',
    status: 'EM_ABERTO',
    equipment: 'Bomba GC-009',
    dueDate: '2022-11-20',
    isAutomatic: true,
    isDelayed: true,
    comments: [
      {
        user: 'Felipe Dutra',
        action: 'alterou o status',
        fromStatus: 'Em Espera',
        toStatus: 'Em Progresso',
        date: '16/10/22'
      },
      {
        user: 'Carlos Almeida',
        action: 'atualizou a data de vencimento para 20/11/2022',
        date: '16/10/22'
      }
    ]
  },
  {
    id: 'GC-009',
    title: 'Inspeção GC-009',
    requester: 'Carlos Almeida',
    status: 'EM_PROGRESSO',
    equipment: 'Bomba GC-009',
    dueDate: '2022-11-20'
  },
  {
    id: 'B16',
    title: 'Análise 3000h do compressor',
    requester: 'Carlos Almeida',
    status: 'EM_ABERTO',
    equipment: 'Motor B16',
    dueDate: '2022-11-15',
    isAutomatic: true
  }
];

const statusIcons = {
  EM_ABERTO: <LockIcon />,
  EM_ESPERA: <AccessTimeIcon />,
  EM_PROGRESSO: <EngineeringIcon />,
  CONCLUIDO: <CheckCircleIcon />
};

const statusColors = {
  EM_ABERTO: '#1976d2',
  EM_ESPERA: '#ed6c02',
  EM_PROGRESSO: '#2e7d32',
  CONCLUIDO: '#1976d2'
};

const statusLabels = {
  EM_ABERTO: 'Em aberto',
  EM_ESPERA: 'Em espera',
  EM_PROGRESSO: 'Em progresso',
  CONCLUIDO: 'Concluído'
};

export const OrdensServico = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrdemServico | null>(mockOrders[0]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Ordens de Serviço
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Painel" />
            <Tab label="Tabela" />
            <Tab label="Calendário" />
          </Tabs>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ ml: 2 }}
          >
            Adicionar Ordem de Serviço
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
        {/* Left Side - OS List */}
        <Box sx={{ width: '30%', minWidth: 300 }}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar ordem de serviço"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <List sx={{ width: '100%' }}>
            {mockOrders.map((order, index) => (
              <ListItem
                key={index}
                onClick={() => setSelectedOrder(order)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: selectedOrder?.id === order.id ? 'action.selected' : 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {order.title}
                      {order.isAutomatic && (
                        <Chip
                          label="Automático"
                          size="small"
                          sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
                        />
                      )}
                      {order.isDelayed && (
                        <Chip
                          label="Atrasada"
                          size="small"
                          sx={{ bgcolor: '#ffebee', color: '#d32f2f' }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Solicitado por {order.requester}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Side - OS Details */}
        {selectedOrder && (
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography variant="h6">{selectedOrder.title}</Typography>
                <Box>
                  <Button variant="outlined" size="small" startIcon={<DescriptionIcon />}>
                    Imprimir
                  </Button>
                  <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                    Editar
                  </Button>
                </Box>
              </Box>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Solicitado por {selectedOrder.requester}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, mt: 3 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: selectedOrder.status === 'EM_ABERTO' ? `${statusColors.EM_ABERTO}15` : 'transparent'
                  }}
                >
                  <LockIcon color={selectedOrder.status === 'EM_ABERTO' ? 'primary' : 'disabled'} />
                  <Typography variant="body2" sx={{ mt: 1 }}>Em aberto</Typography>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: selectedOrder.status === 'EM_ESPERA' ? `${statusColors.EM_ESPERA}15` : 'transparent'
                  }}
                >
                  <AccessTimeIcon color={selectedOrder.status === 'EM_ESPERA' ? 'warning' : 'disabled'} />
                  <Typography variant="body2" sx={{ mt: 1 }}>Em espera</Typography>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: selectedOrder.status === 'EM_PROGRESSO' ? `${statusColors.EM_PROGRESSO}15` : 'transparent'
                  }}
                >
                  <EngineeringIcon color={selectedOrder.status === 'EM_PROGRESSO' ? 'success' : 'disabled'} />
                  <Typography variant="body2" sx={{ mt: 1 }}>Em progresso</Typography>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: selectedOrder.status === 'CONCLUIDO' ? `${statusColors.CONCLUIDO}15` : 'transparent'
                  }}
                >
                  <CheckCircleIcon color={selectedOrder.status === 'CONCLUIDO' ? 'primary' : 'disabled'} />
                  <Typography variant="body2" sx={{ mt: 1 }}>Concluído</Typography>
                </Paper>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Data de Vencimento</Typography>
                  <Typography>{new Date(selectedOrder.dueDate).toLocaleDateString('pt-BR')}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Ativo</Typography>
                  <Chip
                    label={selectedOrder.equipment}
                    sx={{ bgcolor: 'primary.main', color: 'white' }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Responsáveis</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <IconButton size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>Comentários</Typography>
              <List>
                {selectedOrder.comments?.map((comment, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant="subtitle2">{comment.user}</Typography>
                          <Typography variant="body2">{comment.action}</Typography>
                          {comment.fromStatus && (
                            <>
                              <Chip
                                label={comment.fromStatus}
                                size="small"
                                sx={{ bgcolor: '#f5f5f5' }}
                              />
                              <Typography variant="body2">para</Typography>
                              <Chip
                                label={comment.toStatus}
                                size="small"
                                sx={{ bgcolor: '#f5f5f5' }}
                              />
                            </>
                          )}
                        </Box>
                      }
                      secondary={comment.date}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};
