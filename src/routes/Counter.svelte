<script lang="ts">
	let { count = 0 }: { count?: number } = $props();
</script>

<section class="card" style="text-align:center">
	<p style="font-size:2rem;font-weight:700;margin:0">{count}</p>
	<p style="color:var(--text2);font-size:0.8rem">Event count</p>
</section>
