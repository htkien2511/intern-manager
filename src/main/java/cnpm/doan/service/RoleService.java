package cnpm.doan.service;

import cnpm.doan.entity.Role;

public interface RoleService {
    Role findRoleByRoleName(String roleName);
}
