import { Bookmark, HandCoins, IdCard, LayoutGrid, LucideIcon, MapPin, Settings, Users } from 'lucide-react';
import { RoleInApp } from '@/types';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  role: RoleInApp[]; // Change this to an array of RoleInApp
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function SideBarList(pathname: string, role: Exclude<RoleInApp, RoleInApp.GUARD>): Group[] {
  const allMenus: Group[] = [
    {
      groupLabel: '',
      menus: [
        {
          href: `/${role}/dashboard`,
          label: 'Tổng quan',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Quản lý',
      menus: [
        {
          href: '',
          label: 'Hệ thống',
          active: pathname.includes('/users') || pathname.includes('/roles'),
          icon: Users,
          role: [RoleInApp.ADMIN],
          submenus: [
            {
              href: `/${role}/users`,
              label: 'Người dùng',
              active: pathname.includes(`/${role}/users`),
            },
            {
              href: `/${role}/roles`,
              label: 'Vai trò',
              active: pathname === `/${role}/roles`,
            },
          ],
        },
        {
          href: ``,
          label: 'Thẻ gửi xe',
          active: pathname.includes('/card-type') || pathname.includes('/card'),
          icon: IdCard,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [
            {
              href: `/${role}/cards`,
              label: 'Thẻ cứng',
              active: pathname === `/${role}/cards`,
            },
            {
              href: `/${role}/card-type`,
              label: 'Loại thẻ',
              active: pathname === `/${role}/card-type`,
            },
          ],
        },
        {
          href: `/${role}/car-park`,
          label: 'Chỗ để xe',
          active: pathname.includes('/car-park'),
          icon: MapPin,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [],
        },
        {
          href: `/${role}/history`,
          label: 'Danh mục hình ảnh',
          active: pathname.includes('/history'),
          icon: Bookmark,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [],
        },
        {
          href: `/${role}/payment`,
          label: 'Chi trả',
          active: pathname.includes('/payment'),
          icon: HandCoins,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [
            {
              href: `/${role}/payment/pay`,
              label: 'Thanh toán',
              active: pathname === `/${role}/payment/pay`,
            },
            {
              href: `/${role}/payment/bills`,
              label: 'Hóa đơn',
              active: pathname === `/${role}/payment/bills`,
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Cấu hình',
      menus: [
        {
          href: `/${role}/settings`,
          label: 'Cài đặt',
          active: pathname.includes(`/${role}/settings`),
          icon: Settings,
          role: [RoleInApp.ADMIN, RoleInApp.USER],
          submenus: [
            {
              href: `/${role}/settings/profile`,
              label: 'Thông tin cá nhân',
              active: pathname === `/${role}/settings/profile`,
            },
            {
              href: `/${role}/settings/password`,
              label: 'Quản lý mật khẩu',
              active: pathname === `/${role}/settings/password`,
            },
            {
              href: `/${role}/settings/personalisation`,
              label: 'Cá nhân hoá',
              active: pathname === `/${role}/settings/personalisation`,
            },
          ],
        },
      ],
    },
  ];

  // Filter menus based on role
  return allMenus.map(group => ({
    groupLabel: group.groupLabel,
    menus: group.menus.filter(menu => menu.role.includes(role)),
  })).filter(group => group.menus.length > 0);
}
