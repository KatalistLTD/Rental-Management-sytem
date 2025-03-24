import TenantForm from "../../components/TenantForm";
import TenantList from "../../components/TenantList";

function LandlordTenants() {
  return (
    <div>
      <h1 className="title">Tenants</h1>
      <TenantForm />
      <TenantList />
    </div>
  );
}

export default LandlordTenants;
