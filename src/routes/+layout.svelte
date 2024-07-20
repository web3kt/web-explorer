<script lang="ts">
    import NavItem from "$lib/component/NavItem.svelte";
    import Icon from "$lib/component/Icon.svelte";
</script>

<div class="container">
    <div class="row">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Explorer</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavItem href="/block">Block</NavItem>
                        <NavItem href="/tx">Transaction</NavItem>
                        <NavItem href="/token">Token</NavItem>
                    </ul>
                </div>
            </div>
        </nav>
    </div>

    <slot/>

    <footer class="py-3 my-4 border-top">
        <p class="text-center">
            <Icon name="c-circle"/>
            2024 web3kt.org
        </p>
    </footer>
</div>