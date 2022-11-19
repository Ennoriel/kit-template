
<script>
    import Notifications from 'svelte-notifications';
  </script>
  
  <Notifications>
    <slot />
  </Notifications>

<style>
    :global(.notifications .position-top-right) {
        top: var(--header-height);
        right: 0;
        max-width: 500px;
    }

    @media(min-width: 768px) {
        :global(.notifications .position-top-right .notification-content) {
            width: 310px;
        }
    }
</style>